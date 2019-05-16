require 'test_helper'

class DisciplinasControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get disciplinas_index_url
    assert_response :success
  end

  test "should get create" do
    get disciplinas_create_url
    assert_response :success
  end

  test "should get show" do
    get disciplinas_show_url
    assert_response :success
  end

  test "should get destroy" do
    get disciplinas_destroy_url
    assert_response :success
  end

end
