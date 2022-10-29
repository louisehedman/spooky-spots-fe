type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  paginate: any;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalPosts, postsPerPage, paginate } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={(event) => {
                paginate(number);
                event.preventDefault();
              }}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
