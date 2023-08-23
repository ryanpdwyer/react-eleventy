
// const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// const markdownItAnchor = require("markdown-it-anchor");


module.exports = (function(eleventyConfig) {
    eleventyConfig.setWatchJavaScriptDependencies(false);
    // add support for syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);
    // eleventyConfig.addPlugin(UpgradeHelper);
    // eleventyConfig.setLibrary("md", mdLib => mdLib.use(markdownItAnchor));

    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("samples");
    eleventyConfig.addPassthroughCopy("pdf");

});
