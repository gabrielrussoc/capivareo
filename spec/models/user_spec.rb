require 'rails_helper'

RSpec.describe User, type: :model do

  before(:all) do
    @user1 = create(:user)
  end

  it 'is valid with valid attributes' do
    expect(@user1).to be_valid
  end

  it 'has a unique email' do
    expect { create(:user, nusp: '0') }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Email has already been taken')
  end

  it 'has a unique nusp' do
    expect { create(:user, email: 'a@a.com') }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Nusp has already been taken')
  end

  it 'has a name' do
    user =  build(:user, nome: '')
    expect(user).to_not be_valid
  end

  it 'has a nusp' do
    user =  build(:user, nusp: '')
    expect(user).to_not be_valid
  end

  it 'has a numerical nusp' do
    user =  build(:user, nusp: 'abc')
    expect(user).to_not be_valid
  end

  after(:all) do
    @user1.destroy
  end
end
