---
title: "Inspiration"
bg: pink  #defined in _config.yml, can use html color like '#0fbfcf'
color: white   #text color
fa-icon: cogs
---

# Inspiration


<div class="icontain">
  <iframe src="//www.youtube.com/embed/FoEPlE8Pg7I"   allowfullscreen></iframe>
</div>

<script type="text/javascript">

 var imlocation = "img/random/";
 var currentdate = 0;
 var image_number = 0;
 function ImageArray (n) {
   this.length = n;
   for (var i =1; i <= n; i++) {
     this[i] = ' '
   }
 }
 image = new ImageArray(3)
 image[0] = 'smart-norrkoping1.png'
 image[1] = 'smart-norrkoping2.png'
 image[2] = 'smart-norrkoping3.png'
 image[4] = 'smart-norrkoping4.png'
 var rand = 60/image.length
 function randomimage() {
 	currentdate = new Date()
 	image_number = currentdate.getSeconds()
 	image_number = Math.floor(image_number/rand)
 	return(image[image_number])
 }
 document.write("<img src='" + imlocation + randomimage()+ "'>");
 
</script>

<script type="text/javascript"> 
randomimage();

</script>