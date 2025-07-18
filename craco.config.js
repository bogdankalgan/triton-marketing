module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            const glslRule = {
                test: /\.(glsl|vs|fs)$/,
                exclude: /node_modules/,
                use: 'raw-loader',
            };

            // Найти один из правил с oneOf и вставить туда наш glsl loader
            const oneOfRule = webpackConfig.module.rules.find(rule => Array.isArray(rule.oneOf));

            if (oneOfRule) {
                oneOfRule.oneOf.unshift(glslRule); // вставляем в начало, чтобы перехватить до file-loader
            }

            return webpackConfig;
        },
    },
};