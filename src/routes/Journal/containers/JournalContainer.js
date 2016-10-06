import { connect } from 'react-redux';
import { saveJournalEntry } from '../modules/journal';

import Journal from '../components/Journal';

const mapActionCreators = {
  saveJournalEntry,
};

const mapStateToProps = (state) => ({
  user: state.user,
  journal: state.journal,
});

export default connect(mapStateToProps, mapActionCreators)(Journal);
