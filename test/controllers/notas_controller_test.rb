require 'test_helper'

class NotasControllerTest < ActionDispatch::IntegrationTest
  test "should get create_or_update" do
    get notas_create_or_update_url
    assert_response :success
  end

end
