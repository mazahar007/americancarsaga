<?php
// Copy this file to your hosting OUTSIDE public_html, named acs-config.php
// e.g. /home/YOUR_CPANEL_USER/acs-config.php  — then fill in the values.
// Never put the real file in public_html or in the GitHub repo.
return [
    // From GitHub → Settings → Developer settings → OAuth Apps
    'github_client_id'     => 'PASTE_CLIENT_ID',
    'github_client_secret' => 'PASTE_CLIENT_SECRET',

    // Contact form: where messages go, and a sender address on your own domain
    'contact_to'   => 'you@example.com',
    'contact_from' => 'no-reply@americancarsaga.com',
];
