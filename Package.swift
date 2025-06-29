// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterPlain",
    products: [
        .library(name: "TreeSitterPlain", targets: ["TreeSitterPlain"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterPlain",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterPlainTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterPlain",
            ],
            path: "bindings/swift/TreeSitterPlainTests"
        )
    ],
    cLanguageStandard: .c11
)
