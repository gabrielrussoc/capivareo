require 'rails_helper'

RSpec.describe Disciplina, type: :model do
  it 'is valid with valid attributes' do
    expect(build(:disciplina)).to be_valid
  end

  it 'is invalid without a name' do
    expect(build(:disciplina, nome: '')).to_not be_valid
  end

  it 'is invalid without a code' do
    expect(build(:disciplina, nome: '')).to_not be_valid
  end

  it 'is invalid without a semester' do
    expect(build(:disciplina, semestre: nil)).to_not be_valid
  end

  it 'is invalid with incorrect semester dates' do
    expect(build(:disciplina, semestre: '2019-02-01')).to_not be_valid
    expect(build(:disciplina, semestre: '2019-08-01')).to_not be_valid
    expect(build(:disciplina, semestre: '2019-01-02')).to_not be_valid
    expect(build(:disciplina, semestre: '2019-07-02')).to_not be_valid
    expect(build(:disciplina, semestre: '2019-04-05')).to_not be_valid
  end

  it 'is valid without a description' do
    expect(build(:disciplina, descr: '')).to be_valid
  end
end
