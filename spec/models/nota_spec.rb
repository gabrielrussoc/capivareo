require 'rails_helper'

RSpec.describe Nota, type: :model do
  it 'is valid with valid attributes' do
    expect(build(:nota)).to be_valid
  end

  it 'is not valid with floats' do
    expect(build(:nota, nota: 5.5)).to_not be_valid
  end

  it 'is not valid out of range' do
    expect(build(:nota, nota: -1)).to_not be_valid
    expect(build(:nota, nota: 101)).to_not be_valid
  end
end
