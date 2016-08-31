<?php

use Illuminate\Database\Capsule\Manager as Capsule;

header('Content-type:application/json;charset=utf-8');

$file = dirname(dirname(__DIR__)).'/ts/src/vendor/autoload.php';
if (!file_exists($file)) {
    $file = dirname(__DIR__).'/vendor/autoload.php';
}

if (!file_exists($file)) {
    ob_clean();
    echo json_encode(array(
        'status' => false,
        'message' => '安装的程序没有composer初始化!',
    ));
    exit;
}

require $file;

$host = $_REQUEST['host'];
$username = $_REQUEST['username'];
$password = $_REQUEST['password'];
$database = $_REQUEST['database'];
$prefix = $_REQUEST['prefix'];
$port = $_REQUEST['port'];

$config = array(
    'driver' => 'mysql',
    'host' => $host,
    'database' => $database,
    'username' => $username,
    'password' => $password,
    'charset' => 'utf8',
    'port' => intval($port),
    'prefix' => $prefix,
    'collation' => 'utf8_unicode_ci',
);

// 数据库连接
try {
    $capsule = new Capsule;
    $capsule->addConnection($config);
    $capsule->setAsGlobal();
    $capsule->bootEloquent();
    Capsule::select('SHOW TABLES');

} catch (Exception $e) {
    ob_clean();
    echo json_encode(array(
        'status' => false,
        'message' => $e->getMessage(),
    ));
    exit;
}


// 验证是否可以创建数据表
try {
    Capsule::schema()->dropIfExists('test');
    Capsule::schema()->create('test', function($table) {
        $table->increments('id');
        $table->string('name')->unique();
    });
} catch (Exception $e) {
    ob_clean();
    echo json_encode(array(
        'status' => false,
        'message' => '可能该数据库帐户没有权限操作数据表（'.$e->getMessage().'）',
    ));
    exit;
}

// 插入数据
try {
    Capsule::table('test')->insert(array(
        'name' => 'ThinkSNS',
    ));
    Capsule::table('test')->insert(array(
        'name' => 'medz',
    ));
} catch (Exception $e) {
    ob_clean();
    echo json_encode(array(
        'status' => false,
        'message' => '可能该数据库帐户没有权限操作数据表（'.$e->getMessage().'）',
    ));
    exit;
}

// 修改数据
try {
    Capsule::table('test')->where('name', 'medz')->update(array('name' => 'TS'));
} catch (Exception $e) {
    ob_clean();
    echo json_encode(array(
        'status' => false,
        'message' => '可能该数据库帐户没有权限操作数据表（'.$e->getMessage().'）',
    ));
    exit;
}

// 删除数据
try {
    Capsule::table('test')->where('name', 'TS')->delete();
    Capsule::schema()->drop('test');
} catch (Exception $e) {
    ob_clean();
    echo json_encode(array(
        'status' => false,
        'message' => '可能该数据库帐户没有权限操作数据表（'.$e->getMessage().'）',
    ));
    exit;
}

$str = '<?php ';
$str .= PHP_EOL;
$str .= PHP_EOL;
$str .= 'return '.var_export($config);
$str .= ';'.PHP_EOL;

$filepath = dirname(dirname(__DIR__)).'/ts/config/database.php';
file_put_contents($filepath, $str);

ob_clean();
echo json_encode(array(
    'status' => true,
));
exit;
