<?php

$url = $_GET["url"];
if (!empty($url)) {

    // preg_replace('/[^a-zA-Z0-9]/', '', $str);

    // $command = escapeshellcmd('python3 /var/www/html/panel/vista/cms/pythoon/scrap.py -s https://cuevana3.io/serie/panic');
    // $output = Shell_exec($command);
    // var_dump($output);
    // $command = 'python3 /var/www/html/panel/vista/cms/pythoon/scrap.py -s https://cuevana3.io/serie/panic 2>&1';
    var_dump(system('python3 /var/www/html/panel/vista/cms/pythoon/scrap.py -s https://cuevana3.io/serie/panic 2>&1'));
    // exec($command, $out, $status);
    // var_dump($command);
    // var_dump($out);
    // var_dump($status);

    // $res = `python3 /var/www/html/panel/vista/cms/pythoon/scrap.py -s https://cuevana3.io/serie/panic`;
    // // var_dump(exec('python3 --version'));
    // var_dump(system('python3 /var/www/html/panel/vista/cms/pythoon/scrap.py -s https://cuevana3.io/serie/panic'));
    // // $gestor = popen("/bin/ls", "r");
    // // var_dump($gestor);

}

