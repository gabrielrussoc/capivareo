require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
    context 'in dev mode' do
        before(:each) do
            allow(Rails).to receive(:env).and_return('development'.inquiry)
        end

        it 'adds 1s delay' do
            allow(controller).to receive(:sleep).with(1)
            controller.send(:dev_delay)
        end
    end
end
