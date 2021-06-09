const { program } = require("commander");

const { resolve } = require("path");
const fs = require("fs");
const ejs = require('ejs');

// tips shell  交互
const inquirer = require('inquirer');
const chalk = require("chalk");
const dayjs = require('dayjs');

module.exports = function cli() {
  // 打印命令参数
  const version = require("./package.json").version;

  program
    .version(version, "-v, --version")
    .command("blog <name>")
    .description("创建一个新的md文件")
    .action((name) => {
      const currentPath = resolve("./");
      const date = dayjs().format('YYYY-MM-DD');

      // note 使用的ejs 来生成template
      const template = fs.readFileSync(`${__dirname}/bin/template/md.ejs`);
      const code = ejs.render(template.toString(), {
        title: "测试",
        image: 'https://images.unsplash.com/photo-1623228093037-7c2bff771f23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2962&q=80',
        summary: '测试的介绍'
      });

      // return;
      // note: 创建的文件
      fs.writeFile(`${currentPath}/${name}.md`, code, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈 文件创建完成,赶紧去创作吧");
      });
    });

  // 解析输入的参数
  program.parse(process.argv);
};
