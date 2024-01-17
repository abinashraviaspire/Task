using WebAPI.Repository.Abstract;
using WebAPI.Models.Domain;

namespace WebAPI.Repository.Implementation
{
    public class ProductRepostory : IProductRepository
    {
		private readonly DatabaseContext _context;
		public ProductRepostory(DatabaseContext context)
		{
			this._context = context;
		}
        public bool Add(AngularProduct model)
        {
			try
			{
				_context.angularProductsTbl.Add(model);
				_context.SaveChanges();
				return true;
			}
			catch (Exception ex)
			{

				return false;
			}
        }

        public IEnumerable<AngularProduct> GetAll()
		{
			return _context.angularProductsTbl.ToList();
		}


    }
}
