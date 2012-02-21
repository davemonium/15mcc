class Image

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Mongoid::Paperclip
  include Gmaps4rails::ActsAsGmappable
  
  attr_accessor :terms
  validates_acceptance_of :terms, :message => "Debes aceptar las condiciones de uso"

  field :title, type: String
  field :happened_at, type: Time

  validates_presence_of :title
  validates_uniqueness_of :title
  
  has_mongoid_attached_file :img,
    :styles => {
      :small => ['260x180', :jpg],
      :marker => ['20x20', :jpg]
    }

  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'

  belongs_to :user
  field :user_id, type: String

  field :street, type: String
  field :city, type: String
  field :country, type: String
  field :latitude, type: Float
  field :longitude, type: Float
  field :gmaps, type: Boolean
  field :slug, type: String
  field :priority, type: Boolean, :default => false

  before_save :generate_slug

  def self.find_by_slug(slug)
    where(:slug => slug).first
  end

  def to_param
    slug
  end

  def gmaps4rails_address
    "#{self.street}, #{self.city}, #{self.country}" 
  end

  def gmaps4rails_infowindow
    "
    <a href='/images/#{ id }'>
      <h5>#{ERB::Util.html_escape title}</h5>
      <img class='infowindow-thumb' src='#{ img.url(:small) }' />
    </a>
    <b>Etiquetado con</b>: #{ tags }
    "
  end

  def gmaps4rails_marker_picture
    {
     "picture" => img.url(:marker),
     "width" => "20",
     "height" => "20",
     "marker_anchor" => [ 5, 10]
    }
  end   

  protected

  def generate_slug
    self.slug = self.title.parameterize
  end
end
