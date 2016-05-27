import $ from 'jquery';

$('.btn-more').click((e) => {
  $(e.target).closest('.btn-more-container').slideUp();
});

$('[data-expand]').on('click', (e) => {
  var $toggle = $(e.target);
  if(!$toggle.is('a'))
    $toggle = $toggle.closest('a');

  $toggle.closest('[data-expand-container]').slideUp();

  var $target = $($toggle.attr('data-expand'));
  if($target.length === 0)
    return;

  $target.removeClass('collapse');
});