using WebAPI.Models.Domain;

namespace WebAPI.Repository.Abstract
{
    public interface IProductRepository
    {
        bool Add(AngularProduct model);
        IEnumerable<AngularProduct> GetAll();
    }
}
