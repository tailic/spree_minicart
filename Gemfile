source 'http://rubygems.org'

gemspec

if ENV['USE_LOCAL_SPREE']
  gem 'spree_core', :path => '~/code/spree'
else
  gem 'spree', github: 'spree/spree', branch: '2-3-stable'
end
