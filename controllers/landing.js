
const models = require('../models')

const sidepanel = require('../helpers/sidepanel');

const panel = sidepanel.panel

const { addSubscriberToMailchimp } = require('./mailchimp');

exports.get_landing = function(req, res, next) {
  res.render('landing', { title: 'Express', user: req.user });
}

exports.signin_basik = function(req, res, next) {
	res.render('user/signin-basik', { });
}

exports.submit_lead = function(req, res, next) {

	return models.Lead.create({
		email: req.body.lead_email
	}).then(lead => {
		models.Mailchimp.findOne({where: {name: "landing"}}).then(mc => {
			addSubscriberToMailchimp(req.body.lead_email, mc);
			res.redirect('/pricing');	
		})
	})
}

exports.show_leads = function(req, res, next) {
	console.log("panel:", panel)
	return models.Lead.findAll().then(leads => {
 		res.render('lead/leads', { title: 'Express', leads: leads, panel });		
	})
}

exports.show_lead = function(req, res, next) {
	return models.Lead.findOne({
		where : {
			id : req.params.lead_id
		}
	}).then(lead => {
		res.render('lead/lead', { lead : lead, panel });
	});
}

exports.show_edit_lead = function(req, res, next) {
	return models.Lead.findOne({
		where : {
			id : req.params.lead_id
		}
	}).then(lead => {
		res.render('lead/edit_lead', { lead : lead, panel });
	});
}

exports.edit_lead = function(req, res, next) {

	return models.Lead.update({
		email: req.body.lead_email
	}, { 
		where: {
			id: req.params.lead_id
		}
	}).then(result => {
		res.redirect('/lead/' + req.params.lead_id);
	})
}

exports.delete_lead = function(req, res, next) {
	return models.Lead.destroy({
		where: {
			id: req.params.lead_id
		}
	}).then(result => {
		res.redirect('/leads');
	})
}

exports.delete_lead_json = function(req, res, next) {
	return models.Lead.destroy({
		where: {
			id: req.params.lead_id
		}
	}).then(result => {
		res.send({ msg: "Success" });
	})
}
