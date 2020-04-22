module RenderJsonapi
  extend ActiveSupport::Concern

  included do

    def render_jsonapi(*args)
      options = args.extract_options!
      collection = args.first
      collection = paginate_collection(collection) if options[:paginate] == true
      serializer_key = options[:serializer] || compute_collection_type(collection)
      serializer_class_name = compute_serializer_name(serializer_key)
      serializer_options = build_fast_jsonapi_options(options)
      
      if options[:links] == true
        serializer_options[:links] = links_object(collection)
      end

      serialized_collection = serializer_class_name.new(collection, serializer_options)
      status = options[:status] || :ok
  
      render json: serialized_collection, status: status
    end

  end

  private

  def compute_serializer_name(serializer_key)
    return serializer_key unless serializer_key.is_a? Symbol

    path = self.class.controller_path.split("/").map { |path| path.capitalize.to_s }
    version = path.take(path.size - 1).join('::')
    serializer_name = serializer_key.to_s.classify + "Serializer"
    ("#{version}::#{serializer_name}").constantize
  end

  def compute_collection_type(collection)
    if collection.is_a?(ActiveRecord::Relation)
      # ActiveRecord::Relation has a #klass method to divulge the class of records it contains
      collection_class = collection.klass
    else
      collection_class = collection.class
    end

    collection_class.base_class.name.to_sym
  end
  
  def links_object(collection)
    # Generate your top-level links object here
  end

  def paginate_collection(collection)
    # Implement your pagination here
  end

  def build_fast_jsonapi_options(options)
    json_options = {
      params: options[:params] || {},
      meta: options[:meta] || {},
    }
    
    includes = options[:include]
    if includes.present?
      json_options[:include] = includes_array(includes)
    end

    json_options
  end

  def includes_array(includes)
    includes.is_a?(Array) ? includes : [includes]
  end

end