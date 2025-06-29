package tree_sitter_plain_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_plain "github.com/jbr/tree-sitter-plain/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_plain.Language())
	if language == nil {
		t.Errorf("Error loading Plain grammar")
	}
}
