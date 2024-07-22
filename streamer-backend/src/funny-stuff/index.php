<?php
  $directory = "monkeys";
  $images = glob($directory . "/*.jpg");

  foreach($images as $image)
  {
    echo $image;
  }
?>