const { program } = require("commander");

const { resolve } = require("path");
const fs = require("fs");
const ejs = require("ejs");

// tips shell  交互
const inquirer = require("inquirer");
const chalk = require("chalk");
const dayjs = require("dayjs");

const blogConfig = require("./bin/config/blog.js");
module.exports = function cli() {
  // 打印命令参数
  const version = require("./package.json").version;
  // note 执行对blog 命令
  program
    .version(version, "-v, --version")
    .command("blog <name>")
    .description("创建一个新的md文件")
    .action(async (name) => {
      const currentPath = resolve("./");
      const date = dayjs().format("YYYY-MM-DD");

      const blog = await inquirer.prompt(blogConfig())

      // console.log(blog)

      // note 使用的ejs 来生成template
      const template = fs.readFileSync(`${__dirname}/bin/template/md.ejs`);
      const code = ejs.render(template.toString(), {
        title: name,
        image: blog.image,
        summary: blog.summary,
        date: date,
        tags: blog.tags,
        author: blog.author,
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
