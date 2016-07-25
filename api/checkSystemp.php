<?php

header('Content-type:application/json;charset=utf-8');

$ret = array(
    'next' => false,
    'items' => array(),
);
$_state = true;

$push = function(array $item, $status = false) use (&$ret, &$_state) {

    $item['icon'] = $status ? 'success' : 'error';

    array_push($ret['items'], $item);
    $ret['next'] = true;
    if ($_state === false || $status == false) {
        $ret['next'] = false;
    }
    $_state === true && $_state = $status;
};

if (!extension_loaded('json')) {
    echo '{
        next: false,
        items: [
            {
                name: "json",
                icon: "error",
                text: "不支持（必须支持）",
                des: "支持json数据交换"
            }
        ]
    }';
    exit;
}

// php 版本
$status = version_compare(PHP_VERSION, '5.3.12', '>');
$push(array(
    'name' => 'PHP',
    'text' => $status ? PHP_VERSION : '小于5.3.12',
    'des' => '程序运行之基石',
), $status);

// PDO
$status = class_exists('PDO');
$push(array(
    'name' => 'PDO',
    'text' => $status ? '支持' : '未安装',
    'des' => '用于与数据库通信',
), $status);

// GD库
$status = extension_loaded('gd');
$push(array(
    'name' => 'GD库',
    'text' => $status ? '支持' : '未安装',
    'des' => '图片处理库',
), $status);

// curl
$status = extension_loaded('curl');
$push(array(
    'name' => 'cURL',
    'text' => $status ? '支持' : '未安装',
    'des' => '服务端http通信工具',
), $status);

// iconv
$status = extension_loaded('iconv');
$push(array(
    'name' => 'iconv',
    'text' => $status ? '支持' : '未安装',
    'des' => '文本编码转换',
), $status);

// mcrypt
$status = extension_loaded('mcrypt');
$push(array(
    'name' => 'iconv',
    'text' => $status ? '支持' : '未安装',
    'des' => '数据加密工具库',
), $status);

// zip
$status = extension_loaded('zip');
$push(array(
    'name' => 'zip',
    'text' => $status ? '支持' : '未安装',
    'des' => '解压缩文件工具',
), $status);

// zlib
$status = extension_loaded('zlib');
$push(array(
    'name' => 'zlib',
    'text' => $status ? '支持' : '未安装',
    'des' => 'zip必须依赖的库',
), $status);

$root = dirname(dirname(__DIR__)).'/ts';
$testDirIsW = function($dirname, $isFile = false) use ($root) {
    $dirname = sprintf($root.'/'.$dirname);
    if ($isFile) {
        if (file_exists($dirname)) {
            touch($dirname);
        }
        return is_writable($dirname);

    } elseif (!file_exists($dirname)) {
        mkdir($dirname, 0777, true);
    }

    $testFile = $dirname.'/text';
    touch($testFile);

    if (!file_exists($testFile)) {
        return false;
    }

    file_put_contents($testFile, 'medz');
    $status = file_get_contents($testFile) == 'medz';
    unlink($testFile);
    return $status;
};

// data 目录
$status = $testDirIsW('data');
$push(array(
    'name' => '文件夹(data)',
    'text' => $status ? '可写' : '不可写',
    'des' => 'data目录储存上传文件',
), $status);

// storage 目录
$status = $testDirIsW('storage');
$push(array(
    'name' => '文件夹(storage)',
    'text' => $status ? '可写' : '不可写',
    'des' => '用于储存静态资源',
), $status);

// 数据库配置文件
$status = $testDirIsW('config/database.php', true);
$push(array(
    'name' => '文件(config/database.php)',
    'text' => $status ? '可写' : '不可写',
    'des' => '数据库信息配置',
), $status);

ob_clean();
echo json_encode($ret);
exit;