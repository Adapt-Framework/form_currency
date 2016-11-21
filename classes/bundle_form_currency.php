<?php

namespace adapt\forms\currency{
    
    class bundle_form_currency extends \adapt\bundle{
        
        public function __construct($data) {
            parent::__construct('form_currency', $data);
        }
        
        public function boot(){
            if (parent::boot()){
                $this->dom->head->add(new html_script(['type' => 'text/javascript', 'src' => "/adapt/{$this->name}/{$this->name}-{$this->version}/static/js/currency_field.js"]));
                return true;
            }
            
            return false;
        }
    }
    
}
