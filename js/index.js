<!DOCTYPE html>
<html>
<head>
<title>My OS Platform</title>
</head>
<body>
<script>
// get the system platform using node.js
var os = require('os');
document.write('You are running on ', os.platform());
</script>
</body>
</html>