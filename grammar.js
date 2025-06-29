/**
 * @file plaintext or unknown files
 * @author Jacob Rothstein <hi@jbr.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "plain",

  extras: ($) => [
    /[ \t]/, // Only spaces and tabs are extras
  ],

  rules: {
    document: ($) => repeat($._item),

    _item: ($) =>
      choice(
        $.fenced_code_block,
        prec(1, $.list), // Higher precedence for lists
        $.paragraph,
        prec(-1, $.paragraph_break), // Lower precedence for standalone breaks
        $.any_char
      ),

    // Paragraph: content with its terminating break (if any)
    paragraph: ($) =>
      prec.right(
        seq(
          repeat1(choice($.text_line, $.newline)),
          optional($.paragraph_break)
        )
      ),

    // List: consecutive list items with trailing spacing
    list: ($) => prec.right(3, seq(
      $.list_item,
      repeat(choice(
        seq($.newline, $.list_item),
        seq($.paragraph_break, $.list_item)
      )),
      optional(choice($.newline, $.paragraph_break))
    )),

    // Fenced code blocks with optional trailing spacing
    fenced_code_block: ($) =>
      prec.right(
        seq(
          token(seq("```", repeat(choice(/[^`]/, /`[^`]/, /``[^`]/)), "```")),
          optional(choice($.newline, $.paragraph_break))
        )
      ),

    // Double newline = paragraph break
    paragraph_break: ($) => /\r?\n\r?\n+/,

    // Single newline
    newline: ($) => /\r?\n/,

    // A line of text (no newlines)  
    text_line: ($) => choice($.text_content),

    // Text content (excluding common list markers at start)
    text_content: ($) => /[^-*0-9\r\n][^\r\n]*/,

    // List item: starts with bullet, asterisk, or number followed by space (atomic token)
    list_item: ($) => token(seq(
      choice("-", "*", /\d+\./), 
      /[ \t]+/, 
      /[^\r\n]+/
    )),

    // Ultimate fallback
    any_char: ($) => /./,
  },
});
