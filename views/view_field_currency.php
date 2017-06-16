<?php

namespace adapt\forms\currency{
    
    class view_field_currency extends \adapt\forms\view_field_select{
        
        public function __construct($form_data, $data_type, $user_data){
            // Set the form values
            $results = $this->data_source->sql
                ->select('*')
                ->from('currency')
                ->where(new sql_cond('date_deleted', sql::IS, new sql_null()))
                ->order_by('iso_code')
                ->order_by('label')
                ->execute()
                ->results();
            
            // Remove any values already provided to us
            unset($form_data['allowed_values']);
            
            parent::__construct($form_data, $data_type, $user_data);
            
            foreach($results as $result){
                $option = new html_option(
                    $result['iso_code'] . ': ' . $result['label'],
                    [
                        'value' => $result['currency_id'],
                        'data-iso-code' => $result['iso_code'],
                        'data-decimal-places' => $result['decimal_places'],
                        'data-decimal-separator' => $result['decimal_separator'],
                        'data-thousands-separator' => $result['thousands_separator'],
                        'data-symbol-whole' => $result['symbol_whole'],
                        'data-symbol-partial' => $result['symbol_partial'],
                        'data-symbol-whole-html' => $result['symbol_whole_html'],
                        'data-symbol-partial-html' => $result['symbol_partial_html']
                    ]
                );
                if (isset($user_data[$form_data['key_name']]) && $user_data[$form_data['key_name']] == $result['currency_id']) {
                    $option->attr('selected', 'selected');
                }
                
                $this->find('select')->append($option);
            }
        }
        
        public static function unescape($string) {
            return $string;
        }
        
        public static function escape($string) {
            return $string;
        }
        
    }
    
}