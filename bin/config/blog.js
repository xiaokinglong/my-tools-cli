module.exports = () => {
  return [
    {
      type: "input",
      message: "请输入文章的介绍",
      name: "summary",
    },
    {
      type: "checkbox",
      message: "请选择文件tags",
      name: "tags",
      choices: [
        "JavaScript",
        "CSS",
        "HTML",
        "Flutter",
        "Dart",
        "Vue",
        "React",
        "TypeScript",
      ],
      validate: function (value) {
        if (value.length) {
          // 校验位数
          return true;
        }
        return "至少选择一个的tag";
      },
    },
    {
      type: "input",
      message: "请输入author",
      name: "author",
      default: "Long",
    },
    {
      type: "input",
      message: "请设置文章的封面",
      name: "image",
    },
  ];
};
