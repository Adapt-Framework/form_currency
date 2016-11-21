(function($){
    
    $(document).ready(
        function(){
            
            $('body').on(
                'change',
                '.view.field-currency',
                function(event){
                    var $this = $(this);
                    var $form = $this.parents('form');
                    var $fields = $form.find('input[data-validator="currency"]');
                    $fields.attr('style', 'border:1px solid red');
                }
            );
            
        }
    );
    
})(jQuery);