require "test_helper"

class CertificationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @certification = certifications(:one)
  end

  test "should get index" do
    get certifications_url, as: :json
    assert_response :success
  end

  test "should create certification" do
    assert_difference("Certification.count") do
      post certifications_url, params: { certification: { cert_categ: @certification.cert_categ, cert_name: @certification.cert_name, cert_type: @certification.cert_type, issue_date: @certification.issue_date, userID: @certification.userID } }, as: :json
    end

    assert_response :created
  end

  test "should show certification" do
    get certification_url(@certification), as: :json
    assert_response :success
  end

  test "should update certification" do
    patch certification_url(@certification), params: { certification: { cert_categ: @certification.cert_categ, cert_name: @certification.cert_name, cert_type: @certification.cert_type, issue_date: @certification.issue_date, userID: @certification.userID } }, as: :json
    assert_response :success
  end

  test "should destroy certification" do
    assert_difference("Certification.count", -1) do
      delete certification_url(@certification), as: :json
    end

    assert_response :no_content
  end
end
