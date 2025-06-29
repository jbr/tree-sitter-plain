import XCTest
import SwiftTreeSitter
import TreeSitterPlain

final class TreeSitterPlainTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_plain())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Plain grammar")
    }
}
