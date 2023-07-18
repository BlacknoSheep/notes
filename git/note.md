## 配置： ##  
name  
```bash
git config --global user.name "Your Name"
```

email  
```bash
git config --global user.email "email@example.com"
```

## 使用git ##
- 查看当前仓库的状态
```bash
git status
```

- 初始化仓库 
```bash
git init
```

- 文件状态
  - 未跟踪（刚添加到项目文件处于“未跟踪”状态  ）
  - 已跟踪
  - 暂存
  - 未修改
  - 已修改  
  <br>

- 未跟踪 --> 暂存  
```bash
git add <filename>  # 将文件提交到暂存区
git add *  # 将所有已修改（及未跟踪）的文件提交到暂存区
```

- 暂存 --> 未修改  
```bash
git commit -m "注释信息"  # 将暂存区的文件提交到仓库
git commit -a -m "xxx"  # 将所有已修改的文件提交到仓库（未跟踪的文件不会提交）
```

- 修改文件后，文件会变为“已修改”的状态

## 常用命令 ##
- 撤销对工作区文件的修改（ctrl+z）
```bash
git restore <filename>
```

- 取消暂存状态
  - 可以用来撤销add
```bash
git restore --staged <filename>
```

- 删除文件
```bash
git rm <filename>  # 若存在未提交的修改，会阻止删除
git rm <filename> -f  # 强制删除
```
- 注：  
  - 删除后，暂存区会出现 `delete: <filename>`
  - 撤销删除
    ```bash
     # 依次执行
    git restore --staged <filename>  # 撤销暂存
    git restore <filename>  # 撤销删除
    ```

- 移动文件
```bash
git mv 1.txt 2.txt  # 重命名（移动文件和重命名本质是一样的）
```
<hr>

# 分支
git再存储文件时，每一次代码的提交都会创建一个与之对应的节点，git就是通过一个个节点来记录代码的状态的。
节点会构成一个树状结构，树存在多个分支。

默认情况下仓库只有一个主分支（master）。
可以通过 `git branch 分支名` 创建多个分支，各分支之间相互独立。

```bash
git branch  # 查看已有分支
git branch <branch name>  # 创建新的分支

git branch -d <branch name>  # 删除分支，若分支中含有未合并的变更，会阻止删除
git branch -D <branch name>  # 强制删除分支

git switch <branch name>  # 切换分支
git switch -c <branch name>  # 创建新分支并切换到该分支

git branch -m <branch name>  # 重命名当前分支

git merge <branch name> # 合并分支
```
合并分支时，若存在冲突，需要手动处理冲突。  

## 变基（rebase）
除了通过merge来合并分支外，还可以通过变基来完成合并分支。  
通过merge合并分支时，在提交记录中会将所有的分支合并过程全部显示出来，当合并操作较多时，记录会非常复杂。  
```bash
git rebase <base branch>
```
变基的原理：
1. 发起变基时，git会首先找到两条分支的最近共同祖先节点
2. 对比当前分支相对于祖先的历史提交，并将它们提取出来保存到一个新的临时文件中
3. 将当前分支指向基分支的最新提交  

注意1：变基和merge一样，都需要解决冲突  
注意2：变基完成后只是改变了当前分支的基，还需要对分支进行合并  
变基和merge对于合并分支来说，最终的结果是一样的。但是变基会使得记录更加简洁。  
但是，如果分支已经提交给了远程仓库，则尽量不要使用变基。

## 远程仓库（remote）
```bash
# 连接远程仓库
git remote add origin https://github.com/BlacknoSheep/git_learning.git
# git remote add <remote name> <url>
# 若使用ssh，则url为：git@github.com:BlacknoSheep/git_learning.git

# 将当前分支的名字修改为main
git branch -M main

# 将代码上传到服务器
git push -u origin main
```

**远程库的操作命令**
```bash
git remote  # 列出当前关联的远程仓库
git remote add <远程库名> <url>  # 关联远程库
git remote remove <远程库名>  # 删除远程库

git push <远程主机名> <本地分支名>:<远程分支名>  # 向远程库推送代码
git push <远程主机名> <本地分支名>  # 如果本地分支名与远程分支名相同，则可以省略冒号：
# -u 表示将本地分支与远程分支关联起来，这样在以后的 push 和 pull 等操作中就可以省略远程主机名（及远程分支名）和本地分支名，即可直接使用
git push

# 若本地库的版本低于远程库，push默认推送不上去
# 要想推送成功，必须先确保本地库和远程库的版本一致
git fetch <远程主机名>  # 拉取远程库的所有代码
git fetch <远程主机名> <远程分支名>  # 拉取远程库特定分支的代码
git fetch  # 若已关联，可省略
# fetch 只会拉取代码，不会与本地分支进行合并。
# 需要手动进行合并
git merge <本地分支名> <远程主机名>/<远程分支名>

# 拉取代码并自动合并
git pull <远程主机名> <远程分支名>:<本地分支名>
git pull <远程主机名> <远程分支名>
git pull
```
注意：推送代码之前，一定要先从远程库拉取最新的代码

**设置代理**

```bash
# 配置http代理
git config --global http.proxy http://172.0.0.1:xxxx
git config --global https.proxy https://172.0.0.1:xxxx

# 查看代理
git config --global --get http.proxy
git config --global --get https.proxy

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```



## tag标签
每次提交都会存在一个 id。
```bash
git switch <commit id>  # 将HEAD指向某次提交，id可以只写开头一部分
```
**分离头指针**：当头指针没有指向某个分支的头部时，这种状态称为分离头指针（HEAD detached）。分离头指针状态下对代码的操作不会出现在任何分支上。故不应在分离头指针的状态下操作代码。  
若需要切换到过去的节点上进行操作，可以先创建分支，再操作。
```bash
git switch -c <new branch name> <commit id>  # 在某个节点创建新分支并将HEAD指向该分支
```
**tag**：可以为提交设置标签，可以通过标签快速识别不同节点
```bash
git tag  # 显示现有标签
git tag <tag name>  # 为当前节点设置标签
git tag <tag name> <commit id>  # 为特定节点设置标签
# 可以通过标签切换节点
git switch -c <new branch name> <tag>

# push 默认不推送标签
# 推送标签（仅标签）
git push <远程库> <tag name>  # 将特定标签推送到远程库
git push <远程库> --tags  # 将所有标签推送到远程库
git tag -d <tag name>  # 删除本地标签
git push <远程库> --delete <tag name>  # 删除远程库的标签
```

## gitignore
默认情况下，git会监视项目下的所有文件，包括 node_modules 中的文件。  
可以添加一个 `.gitignore` 文件来设置需要被忽略的文件

<hr>

# github 静态页面
- 可以在仓库中添加 gh-pages 分支，此分支下的html文件可以展示为静态页面。可以通过 `账号名称.github.io/仓库名称` 进行访问
- 可以创建一个名为 `账号名称.github.io` 的仓库，此时可以直接通过 `账号名称.github.io` 进行访问。
