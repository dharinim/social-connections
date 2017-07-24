class User < ApplicationRecord
  self.ignored_columns = %w(created_at updated_at)
end
