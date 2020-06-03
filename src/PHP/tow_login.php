<?php


$username = $_POST['userName'];
$userpwd = $_POST['userPwd'];

$link = mysqli_connect('127.0.0.1' , 'root' , 'root' , 'nz2002' , 3306);

$sql = "SELECT * FROM `user` WHERE `username` = '{$username}' AND `userpwd` = '{$userpwd}' ";

$result = mysqli_query($link , $sql);

$arr = mysqli_fetch_all($result , MYSQLI_ASSOC);

if(count($arr) !== 0){
    echo 1;
}else{
    echo 0;
}
mysqli_close($link);