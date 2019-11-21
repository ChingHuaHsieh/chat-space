class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true
  validate :add_error_sample

  def add_error_sample
    if name.empty?
      errors.add(:name, "に関係するエラーを追加")
      errors[:base] << "モデル全体に関係するエラーを追加"
    end
  end
end
