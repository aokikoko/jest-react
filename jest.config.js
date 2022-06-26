module.exports = {
  // 代码测试覆盖率包含的文件
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  // 运行测试前, 使用polyfill对jsdom做补偿, 解决测试过程中兼容性问题
  setupFiles: ["react-app-polyfill/jsdom"],
  // 当测试环境建立好之后, 做一些其他的事情可以在这个配置下添加文件名, 执行这些文件的内容
  setupFilesAfterEnv: ["./node_modules/jest-enzyme/lib/index.js"],
  // 当执行npm run test的时候执行一些测试文件的类型
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  // 测试的运行环境
  testEnvironment: "jest-environment-jsdom-fourteen",
  // 当引入一些模块的时候, 时候node_modules下的babel-jest把文件内容转换
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  // 排除转换的文件
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  // 当被引入的模块做自动化测试的时候, 默认到node_modules里面去找, 在这个配置项里
  // 可以添加想要包含的文件夹
  modulePaths: [],
  // 使用三方模块帮助测试仅测试样式是否存在
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  // 查找添加的后缀文件类型
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  // 使用下面的插件帮助在npm run test的时候提供多个模式
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
