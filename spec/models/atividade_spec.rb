require 'rails_helper'

RSpec.describe Atividade, type: :model do
  it 'is valid with valid attributes' do
    expect(build(:atividade)).to be_valid
  end

  it 'is valid without a description' do
    expect(build(:atividade, desc: '')).to be_valid
  end

  it 'is invalid without a name' do
    expect(build(:atividade, nome: '')).to_not be_valid
  end
end
