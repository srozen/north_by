#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
# == Schema Information
#
# Table name: tickets
#
#  id                :bigint           not null, primary key
#  number            :integer
#  row               :integer
#  status            :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  concert_id        :bigint           not null
#  shopping_carts_id :bigint
#  ticket_orders_id  :bigint
#  user_id           :bigint
#
class Ticket < ApplicationRecord
  belongs_to :concert
  belongs_to :user, optional: true
  belongs_to :ticket_order, optional: true
  belongs_to :shopping_cart, optional: true

  enum status: {
    unsold: "unsold",
    held: "held",
    purchased: "purchased",
    refunded: "refunded"
  }

  def toggle_for(user)
    return unless user
    return if self.user && self.user != user
    case status
    when "unsold"
      update(status: "held", user: user)
    when "held"
      update(status: "unsold", user: user)
    end
  end

  def to_concert_h
    {id: id, row: row, number: number, status: status}
  end

  def self.for_concert(concert_id)
    return Ticket.all unless concert_id
    Ticket.where(concert_id: concert_id)
          .order(row: :asc, number: :asc)
          .all
          .reject(&:refunded?)
  end

  def self.data_for_concert(concert_id)
    for_concert(concert_id).map(&:to_concert_h)
  end

  def unavailable?
    held? || purchased?
  end

  def self.grouped_for_concert(concert_id)
    return [] unless concert_id
    for_concert(concert_id).map(&:to_concert_h).group_by { |t| t[:row] }.values
  end
end
