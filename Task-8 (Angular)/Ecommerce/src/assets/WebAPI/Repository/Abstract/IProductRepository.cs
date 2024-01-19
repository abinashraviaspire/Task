using WebAPI.Models.Domain;

namespace WebAPI.Repository.Abstract
{
    public interface IProductRepository
    {
    bool Add(Product model);
    IEnumerable<AngularProduct> GetAll();
    }
}
