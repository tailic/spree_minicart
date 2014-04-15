module Spree
  BaseHelper.module_eval do

    def link_to_cart(text = nil)
      #return "" if current_spree_page?(spree.cart_path) #minicart needs the cart link on all pages

      text = text ? h(text) : Spree.t('cart')
      css_class = nil

      #<span class='amount'>#{current_order.display_total.to_html}</span>
      if current_order.nil? or current_order.item_count.zero?
        text = "<span class='icon-basket'>0</span> <span class='basket-title'>#{text}</span>".html_safe
        css_class = 'empty'
      else
        text = "<span class='icon-basket'>#{current_order.item_count}</span> <span class='basket-title'>#{text}</span>".html_safe
        css_class = 'full'
      end

      link_to text, spree.cart_path, :class => "cart-info #{css_class}"#, :data => {:toggle => 'dropdown'}
    end

  end
end