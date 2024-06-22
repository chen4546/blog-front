可直接访问http://8.130.27.131:3031/ 来访问myblog网站
本地运行方法
该目录下的项目为个人博客的前端部分，需搭配chen45a6/blog-back使用
1.导入mysql文件夹中的数据库文件mytest.sql到自己的数据库
2.下载chen4546/blog-back 的项目文件，在vscode 或 IntelliJ IDEA 打开 将application.yml文件中的数据库连接选项更改为自己已经导入的数据库，端口不变，
3.本目录下的项目文件本地使用vscode打开 将每个文件中url的公网IP：8.130.27.131更改为localhost即可本地化
4.在终端中 .\myblog-front-admin 后 npm run dev 运行项目
