<?php

$regname = $_POST['userName']; 
$regpwd = $_POST['userPwd']; 

$link = mysqli_connect('127.0.0.1' , 'root' , 'root' , 'nz2002' , 3306);

$sql = "INSERT INTO `user`(`username` , `userpwd`) VALUES ( '{$regname}' , '{$regpwd}' )";

$result = mysqli_query($link , $sql);

if($result === true){
    echo 1;
}else{
    echo 0;
}

mysqli_close($link);