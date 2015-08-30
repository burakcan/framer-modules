$.fx.speeds._default = 330;

$(".modules").on("click", ".module:not([data-selected='true'])", function () {

    $(".modules").attr("data-module-selected", "true");

    $(".module")
        .attr("data-selected", "false")
        .find(".module-detail").slideUp();

    $(this)
        .attr("data-selected", "true")
        .find(".module-detail").slideDown();
});


$(".modules").on("click", ".module[data-selected='true'] .module_switch", function () {

    $(".modules").attr("data-module-selected", "false");

    $(this).parents(".module")
        .attr("data-selected", "false")
        .find(".module-detail").slideUp();
});