class V1::CertificationsController < ApplicationController
  before_action :set_certification, only: %i[ update destroy ]

  before_action :authenticate

  include Authentication

  # GET /certifications
  def index
    @certifications = Certification.all

    render json: @certifications
  end

  # GET /certifications/1
  def show
    @certification = Certification.where(user_id: params[:id])
    if @certification.empty?
      render json: { error: "Certification(s) not found" }, status: :not_found
    else
      render json: @certification
    end 
  end

  # POST /certifications
  def create
    @certification = Certification.new(certification_params)

    if @certification.save
      render json: @certification, status: :created
    else
      render json: @certification.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /certifications/1
  def update
    if @certification.update(certification_params)
      render json: @certification
    else
      render json: @certification.errors, status: :unprocessable_entity
    end
  end

  # DELETE /certifications/1
  def destroy
    @certification.destroy
  end

  def authenticate
    authenticate_user
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_certification
      @certification = Certification.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def certification_params
      params.require(:certification).permit(:user_id, :issue_date, :cert_name, :cert_type, :cert_categ)
    end
end
