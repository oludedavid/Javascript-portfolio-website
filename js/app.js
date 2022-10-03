//importing the count up module
import { CountUp } from "./countUp.js";

var $ = jQuery.noConflict();
//The loader
$(window).on("load", function () {
  $(".loader .inner").fadeOut(500, function () {
    $(".loader").fadeOut(750);
  });

  //using isotope
  $(".items").isotope({
    filter: "*",
    animationOptions: {
      duration: 1500,
      easing: "linear",
      queue: false,
    },
  });
});

//super slide animation
$(document).ready(function () {
  $("#slides").superslides({
    animation: "fade",
    play: 7000,
    pagination: false,
  });

  //Typed animation
  var typed = new Typed("#sub", {
    strings: [
      "Hi, there  I am a Web Developer, I build user interfaces.",
      "Software Engineer.",
      "Business Informatics Student.",
    ],
    typeSpeed: 70,
    loop: true,
    startDelay: 1000,
    showCursor: false,
  });

  // Owl carousel animation

  //Owl-animation
  $(".owl-carousel").owlCarousel({
    autoplay: true,
    autoplaySpeed: 300,
    loop: true,
    margin: 10,
    dots: true,
    items: 4,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      938: {
        items: 4,
      },
    },
  });

  // //Enabling the owl-nav
  // $(".owl-carousel").find(".owl-nav").removeClass("disabled");
  // $(".owl-carousel").on("changed.owl.carousel", function (event) {
  //   $(this).find(".owl-nav").removeClass("disabled");
  // });
  // OR just display owl-nav as block and give it important .owl-nav { display: block !important; }

  //Stats animation
  var skillsTopOffset = $(".skillsSection").offset().top;
  var statsTopOffset = $(".statsSection").offset().top;
  var countUpFinish = false;

  // Window on scroll event usin jquery
  $(window).scroll(function () {
    // pie chart animation
    if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
      $(".chart").easyPieChart({
        easing: "easeInOut",
        barColor: "#fff",
        trackColor: false,
        scaleColor: false,
        lineWidth: 4,
        size: 152,
        onStep: function (from, to, percent) {
          $(this.el).find(".percent").text(Math.round(percent));
        },
      });
    }
    //Count up animation
    if (
      !countUpFinish &&
      window.pageYOffset > statsTopOffset - $(window).height() + 200
    ) {
      var count = document.querySelectorAll(".counter");
      count.forEach((el) => {
        var endVal = parseInt(el.innerHTML);
        var countUp = new CountUp(el, endVal);
        countUp.start();
      });

      countUpFinish = true;
    }
  });

  //Fancy Box

  $("[data-fancybox]").fancybox();

  //Adding a filter to the portfolio section

  $("#filters a").click(function () {
    $("#filters .current").removeClass("current");
    $(this).addClass("current");

    var selector = $(this).attr("data-filter");
    $(".items").isotope({
      filter: selector,
      animationOptions: {
        duration: 1500,
        easing: "linear",
        queue: false,
      },
    });

    return false;
  });

  //Adding Transition to the target element after clicking a link

  $("#navigation li a").click(function (e) {
    e.preventDefault();

    var targetElement = $(this).attr("href");
    var targetPosition = $(targetElement).offset().top;
    $("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");
  });

  //Sticky Navigation Bar
  const nav = $("#navigation");
  const navTop = nav.offset().top;

  $(window).on("scroll", stickyNavigation);

  function stickyNavigation() {
    var body = $("body");

    if ($(window).scrollTop() >= navTop) {
      body.css("padding-top", nav.outerHeight() + "px");
      body.addClass("fixedNav");
    } else {
      body.css("padding-top", 0);
      body.removeClass("fixedNav");
    }
  }
});
