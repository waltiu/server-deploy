#!/bin/bash

path=$1
port=$2
containerName=$3
username=$4
password=$5

imagepath=registry.cn-beijing.aliyuncs.com/$path


# 这里大家可以提前在安装依赖的时候就执行一遍 docker login ，就不用输入密码(docker login --username=waltiu registry.cn-beijing.aliyuncs.com)

# 或者在执行脚本的时候输入下密码
# echo -e "---------docker Login--------"
# docker login --username=$username  --password=$password   # 你docker的用户名和密码

echo $(date +%F%n%T)  >> log.txt

echo  路径：$path  容器名称： $containerName   端口： $port  >> log.txt

echo -e "---------docker restart--------"  >> log.txt

echo -e "---------docker Stop--------" >> log.txt
docker stop  $containerName  # 停止容器
echo -e "---------docker Rm--------" >> log.txt
docker rm  	 $containerName  # 删除容器

echo -e "---------docker Pull--------" >> log.txt
docker pull $imagepath		 # 更新镜像

echo -e "---------docker Create and Start--------" >> log.txt
docker run --rm -d -p $port:80 --name $containerName $imagepath # 重启容器
echo -e "---------deploy Success--------" >> log.txt

# 本地调试可以打开
# sleep 1000

# echo -e "---------deploy end--------"