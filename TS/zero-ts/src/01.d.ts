declare const enum Language {
    TypeScript = "TS",
    JavaScript = "JS",
    Java = "JAVA",
    Ruby = "RB"
}
declare const Language2: {
    readonly TypeScript: "TS";
    readonly JavaScript: "JS";
    readonly Java: "JAVA";
    readonly Ruby: "RB";
};
type LangCode = keyof typeof Language;
type Language2 = "TypeScript" | "Java" | "Ruby";
declare function getLang(LangCode: LangCode): void;
