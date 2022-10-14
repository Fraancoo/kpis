const router = require('express').Router();

const kpis = [{
      name: 'Ventas',
      goal: {
        type: 'Min',
        value: 62297.96
      },
      captured: 71437.8,
      created_at: '10-13-22 (14:03:43)'
    },
    {
      name: 'Cuentas por cobrar',
      goal: {
        type: 'Max',
        value: 50086.78
      },
      captured: 97142.52,
      created_at: '10-11-22 (10:25:21)'
    },
    {
      name: 'Iventario',
      goal: {
        type: 'Between',
        value: {
          min: 21377.41,
          max: 35629.01
        }
      },
      captured: 50719.66,
      created_at: '10-12-22 (16:37:18)'
    }];

  //Get kpis
router.get('/',(req, res)=>{
    if (kpis.length > 0) {
        res.json({
            status: 1,
            kpis: kpis
        });
    } else {
        res.json({
            status: 0,
            message: 'Error, not kpis found'
        });
    }
});

module.exports = router;