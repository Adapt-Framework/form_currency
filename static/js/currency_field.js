(function($){
    
    $(document).ready(
        function(){
            
            update_currency_fields = function(){
                $('.view.field-currency select').each(
                    function(){
                        $(this).change();
                    }
                );
            };
            
            update_currency_fields();
            
            $('body').on(
                'change',
                '.view.field-currency select',
                function(event){
                    var $this = $(this);
                    var $option = $this.find('option[value="' + $this.val() + '"]');
                    var $form = $this.parents('form');
                    var $fields = $form.find('input[data-validator="currency"],input[data-validator="currency_positive_non_zero"]');
                    
                    var format = {
                        name: $option.text(),
                        iso_code: $option.attr('data-iso-code'),
                        decimal_places: $option.attr('data-decimal-places'),
                        decimal_separator: $option.attr('data-decimal-separator'),
                        thousands_separator: $option.attr('data-thousands-separator'),
                        symbol_partial: $option.attr('data-symbol-partial'),
                        symbol_whole: $option.attr('data-symbol-whole'),
                        symbol_partial_html: $option.attr('data-symbol-partial-html'),
                        symbol_whole_html: $option.attr('data-symbol-whole-html')
                    };
                    
                    $fields.each(
                        function(){
                            var $this = $(this);
                            $this.attr('data-name', format.name);
                            $this.attr('data-iso-code', format.iso_code);
                            $this.attr('data-decimal-places', format.decimal_places);
                            $this.attr('data-decimal-separator', format.decimal_separator);
                            $this.attr('data-thousands-separator', format.thousands_separator);
                            $this.attr('data-symbol-partial', format.symbol_partial);
                            $this.attr('data-symbol-whole', format.symbol_whole);
                            $this.attr('data-symbol-partial-html', format.symbol_partial_html);
                            $this.attr('data-symbol-whole-html', format.symbol_whole_html);
                            $this.attr('data-ignore', 'Yes');
                            
                            if ($this.val()) {
                                var value = adapt.sanitize.unformat('currency', $this.val());
                                value = adapt.currency.format_with_format(value, format);
                                $this.val(value);
                            }
                        }
                    );
                }
            );
            
            
            $('body').on(
                'blur',
                'input[data-formatter="currency"]',
                function(event){
                    var $this = $(this);
                    var value = $this.val();
                    var valid = false;

                    /* Only do this if we have a value */
                    if (value){
                        /* Do we have an unformatter? */
                        if ($this.attr('data-unformatter')){
                            var unformatter = $this.attr('data-unformatter');

                            value = adapt.sanitize.unformat(unformatter, value);
                        }

                        /* Do we have a validator? */
                        if ($this.attr('data-validator')){
                            var validator = $this.attr('data-validator');

                            valid = adapt.sanitize.validate(validator, value);
                        }else{
                            /* Validation not required */
                            valid = true;
                        }

                        if (valid){
                            var format = {
                                name: $this.attr('data-name'),
                                iso_code: $this.attr('data-iso-code'),
                                decimal_places: $this.attr('data-decimal-places'),
                                decimal_separator: $this.attr('data-decimal-separator'),
                                thousands_separator: $this.attr('data-thousands-separator'),
                                symbol_partial: $this.attr('data-symbol-partial'),
                                symbol_whole: $this.attr('data-symbol-whole'),
                                symbol_partial_html: $this.attr('data-symbol-partial-html'),
                                symbol_whole_html: $this.attr('data-symbol-whole-html')
                            };

                            if (format.iso_code != ''){
                                if ($this.val()) {

                                    /* Check to see if the value is a number or empty */
                                    if(!isNaN(value) && value !== '') {
                                        var value = adapt.sanitize.unformat('currency', $this.val());
                                        value = adapt.currency.format_with_format(value, format);
                                        $this.val(value);    
                                    } else {
                                        $this.val('');
                                    }
                                }
                            }
                            
                            $this.parents('.form-group').addClass('has-success').addClass('has-feedback').find('input').after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
                        }else{
                            $this.parents('.form-group').addClass('has-error').addClass('has-feedback').find('input').after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
                            $this.parents('.forms.view.form').find('#' + $this.parents('.form-control').attr('data-form-page-id')).removeClass('selected').addClass('error');
                        }
                    }

                    update_dependencies();
                    
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    event.cancelBubble = true;
                    return false;
                }
            );
        }
    );
    
})(jQuery);