using WebAPI.Data;
using WebAPI.Models.Domain;
using WebAPI.Models.Domain;
using WebAPI.Repository.Abstract;

namespace WebAPI.Repository.Implementation
{
    public class ProductRepostory :IProductRepository
    {
		private readonly DataContext _context;
		public ProductRepostory(DataContext context)
		{
			this._context = context;
		}
        public bool Add(Product model)
        {
			try
			{
				_context.Product.Add(model);
				_context.SaveChanges();
				return true;
			}
			catch (Exception ex)
			{

				return false;
			}
        }

        public IEnumerable<Product> GetAll()
		{
			return _context.Product.ToList();
		}

    IEnumerable<AngularProduct> IProductRepository.GetAll()
    {
      throw new NotImplementedException();
    }
  }
}
