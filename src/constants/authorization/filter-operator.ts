/**
 * Method filter operator
 */
enum FilterOperator {
  /**
   * Only for the specified role
   */
  only = 'only',
  /**
   * For all nested roles
   */
  and = 'and',
}

export default FilterOperator;
